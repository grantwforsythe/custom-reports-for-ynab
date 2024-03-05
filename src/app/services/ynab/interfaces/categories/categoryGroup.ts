import { Category } from './category';

export interface CategoryGroup {
  id: string;
  name: string;
  /**
   * Whether or not the category group is hidden
   */
  hidden: boolean;
  /**
   * Whether or not the category group has been deleted. Deleted category groups will only be included in delta requests.
   */
  deleted: boolean;
  categories?: Category[];
}
