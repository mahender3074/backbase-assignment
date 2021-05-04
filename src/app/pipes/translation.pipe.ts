import { Pipe, PipeTransform } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  private static data: any = null
  private static busy: boolean = false
  private static queue: {
    input: string
    resolve: (result: string) => void
  }[] = []

  private flatten(data) {
    var result = {}

    function recurse(cur, prop) {
      if (Object(cur) !== cur) {
        result[prop] = cur
      } else if (Array.isArray(cur)) {
        for (var i = 0, l = cur.length; i < l; i++)
          recurse(cur[i], prop + '[' + i + ']')
        if (l == 0) result[prop] = []
      } else {
        var isEmpty = true
        for (var p in cur) {
          isEmpty = false
          recurse(cur[p], prop ? prop + '.' + p : p)
        }
        if (isEmpty && prop) result[prop] = {}
      }
    }

    recurse(data, '')
    return result
  }

  private async resolveAll() {
    TranslatePipe.busy = false
    while (TranslatePipe.queue.length > 0) {
      let el = TranslatePipe.queue.pop()
      this.transform(el.input).then(el.resolve)
    }
  }

  constructor(
    private http: HttpClient,
  ) {}

  async transform(value: string): Promise<string> {
    if (!TranslatePipe.data) {
      if (!TranslatePipe.busy) {
        try {
          TranslatePipe.busy = true

          TranslatePipe.data = this.flatten(
            await this.http
              .get(
                `/assets/langs/${
                  localStorage.getItem('language') || 'en-US'
                }.lang.json`,
              )
              .toPromise()
              .then((res) => res),
          )

          this.resolveAll()
        } catch (ex) {
          TranslatePipe.data = {}
          this.resolveAll()
        }
      } else {
        return new Promise<string>((resolve) => {
          TranslatePipe.queue.push({ input: value, resolve })
        })
      }
    }

    return TranslatePipe.data[value] || value
  }
}
