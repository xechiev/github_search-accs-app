export class Search {
  constructor(layout, api) {
    this.layout = layout;
    this.api = api;

    this.layout.input.addEventListener('input', this.debounce(this.searchRepositoriess.bind(this), 250));

  }

  searchRepositoriess(e) {
      const searchValue = e.target.value.trim();
      if(searchValue.length) {
         this.api.loadAccounts(searchValue).then(res => this.updatedAccounts(res))        
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
