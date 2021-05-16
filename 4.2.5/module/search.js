export class Search {
  constructor(layout, api) {
    this.layout = layout;
    this.api = api;
    
    this.layout.input.addEventListener('keypress', this.debounce(this.searchRepositoriess.bind(this), 500));
  }

  searchRepositoriess() {
    let inputValue = this.layout.input.value;
    if(inputValue.length == inputValue.replace(" ", "").length) {
        this.api.loadAccounts(inputValue).then(res => this.updatedAccounts(res))
    } else {
      this.clearAccounts();
    }
  }

  updatedAccounts(res) {
      if(res.ok) {
         this.clearAccounts(); 
          res.json().then(res => {
              if(res.items) {
                  res.items.forEach(acc => this.layout.createAccounts(acc));
              } else {
                  this.clearAccounts();
              }
          })
      } else {
          console.log('Возникла ошибка: ' + res.status)
      }
  }


  clearAccounts() {
    this.layout.box_1.innerHTML = ''; 
  };

  debounce = (fn, ms) => {
    let timeout;
    return function () {
      const fnCall = () => { fn.apply(this, arguments) }
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, ms)
    };
  }
};