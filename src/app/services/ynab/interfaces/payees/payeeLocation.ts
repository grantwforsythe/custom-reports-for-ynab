export interface PayeeLocation {
  id: string;
  payeeId: string;
  latitude: string;
  longitude: string;
  /**
   *
   * Whether or not the payee location has been deleted.  Deleted payee locations will only be included in delta requests.
   */
  deleted: boolean;
}
