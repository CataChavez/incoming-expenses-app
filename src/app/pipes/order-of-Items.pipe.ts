import { Pipe, PipeTransform } from '@angular/core';
import { IncomingExpenses } from '../models/incomingexpenses.model';

@Pipe({
    name: 'orderItems'
})

export class orderItemsPipe implements PipeTransform {
    transform(items: IncomingExpenses[] ): IncomingExpenses[] {
        return items.sort((a, b) => {
            if (a.type == 'incoming') {
                return -1;
            } else {
                return 1;
            }
        });
    }
}