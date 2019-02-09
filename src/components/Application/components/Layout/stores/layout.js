import { observable, action } from 'mobx';

class Layout {
  @observable
  isLoading = false;

  @action.bound
  setLoading(isLoading) {
    this.isLoading = isLoading;
  }
}

export default new Layout();
