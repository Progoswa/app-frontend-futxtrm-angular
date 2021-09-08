import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'days'
})
export class DaysPipe implements PipeTransform {

  constructor(
    private translate:TranslateService
  ){

  }

  transform(value: any, args?: any): any {
    switch (value) {
      case 0:
        return this.translate.instant("days.sunday")
        break;
      case 1:
        return this.translate.instant("days.monday")
        break;
      case 2:
        return this.translate.instant("days.tuesday")
        break;
      case 3:
        return this.translate.instant("days.wednesday")
        break;
      case 4:
        return this.translate.instant("days.thursday")
        break;
      case 5:
        return this.translate.instant("days.friday")
        break;
      case 6:
        return this.translate.instant("days.saturday")
        break;
    
      default:
        break;
    }
  }

}
