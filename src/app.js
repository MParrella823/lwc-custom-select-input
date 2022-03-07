import { LightningElement } from "lwc";

let apgSelectOptions = [
  {
    label: 'APG - PLANE - A123',
    value: 'abc123def456'
  },
  {
    label: 'APG - PLANE - B321',
    value: '456def123abc'
  },
  {
    label: 'APG - PLANE - C213',
    value: 'abcdef123456'
  }
];

let testQuoteLineData = [
  {
    aircraftId: 'abc12345',
    aircraftName: 'PLANE1',
    isRegistered: false,
    listTag: 'APG|PLANE1|PRODUCT1',
    productFamily: 'APG',
    productName: 'PRODUCT1',
    quoteLineId: 'abc123',
    selectedTail: {
      value : '',
      label : ''
    },
    sysTailWrappers: apgSelectOptions
  },
  {
    aircraftId: 'def4567',
    aircraftName: 'PLANE1',
    isRegistered: false,
    listTag: 'APG|PLANE1|PRODUCT1',
    productFamily: 'APG',
    productName: 'PRODUCT1',
    quoteLineId: 'def456',
    selectedTail: {
      value : '',
      label : ''
    },
    sysTailWrappers: apgSelectOptions
  },
  {
    aircraftId: 'ghi7890',
    aircraftName: 'PLANE1',
    isRegistered: false,
    listTag: 'APG|PLANE1|PRODUCT1',
    productFamily: 'APG',
    productName: 'PRODUCT1',
    quoteLineId: 'ghi789',
    selectedTail: {
      value : '',
      label : ''
    },
    sysTailWrappers: apgSelectOptions
  },
];

export default class App extends LightningElement {
  title = "Testing new custom select";

  apgTails = testQuoteLineData;
  tailNameMap = new Map();
  selected;

  connectedCallback(){
    apgSelectOptions.forEach(item => {
      this.tailNameMap.set(item.value, item.label);
    });
  }

  handleChange(event){
    let tailClone = [];
    this.selected = event.target.value;
    let dataClone = [];
    dataClone = JSON.parse(JSON.stringify(this.apgTails));
    dataClone.forEach(item => {
      if (item.quoteLineId === event.target.dataset.id){
        item.isRegistered = true;
        item.selectedTail = {
          value : event.target.value,
          label : this.tailNameMap.get(event.target.value)
        };        
        tailClone = item.sysTailWrappers.filter(item => item.value !== event.target.value);
      } // End row-level edits      
        item.sysTailWrappers = tailClone;
    });
    
    this.apgTails = dataClone;
    
  }

  handleIconClick(event){
    let dataClone = [];
    let tailClone = [];
    
    dataClone = JSON.parse(JSON.stringify(this.apgTails));
    let selectedValue = '';
    dataClone.forEach(item => {
      if (item.quoteLineId === event.target.dataset.id){
        item.isRegistered = false;
        selectedValue = item.selectedTail;
        item.selectedTail = {};   
      }
      console.log(tailClone);
      tailClone = JSON.parse(JSON.stringify(item.sysTailWrappers));
      tailClone.push({label: this.tailNameMap.get(selectedValue.value), value: selectedValue.value}); 
      console.log(tailClone);
      item.sysTailWrappers = tailClone;
    });
    this.apgTails = dataClone;
  }

}
