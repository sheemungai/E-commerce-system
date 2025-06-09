import { PureAbility, AbilityBuilder } from '@casl/ability';
import { Action } from './action.enum';
import { Injectable } from '@nestjs/common';
import { Role } from '../users/enums/user-role.enum';

type Subject =
  | 'User'
  | 'Product'
  | 'Order'
  | 'Category'
  | 'Payment'
  | 'OrderItem'
  | 'all';

//define the type of the ability were going to use

export type AppAbility = PureAbility<[Action, Subject]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: { role: Role }): AppAbility {
    const { can, build } = new AbilityBuilder<AppAbility>(PureAbility);

    if (user.role === Role.ADMIN) {
      can(Action.Manage, 'all');
      can(
        [Action.Read, Action.Create, Action.Update, Action.Delete],
        ['Product', 'Category', 'User', 'Order', 'Payment'],
      );
    } else if (user.role === Role.USER) {
      //Users can read their own products and categories
      can(Action.Read, ['Product', 'Category']);

      //add items to their cart
      can([Action.Create, Action.Read, Action.Update], ['OrderItem']);
      can([Action.Create, Action.Read], ['Order']);
      can([Action.Create], ['Payment']);
    }
    return build();
  }
}
