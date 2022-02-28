import { LightningElement, track } from "lwc";

let apgSelectOptions = [
  {
    id: 0,
    label: 'Select a System Tail...',
    value: '',
    disabled: null
  },
  {
    id: 1,
    label: 'APG - PLANE - A123',
    value: 'abc123def456',
    disabled: null
  },
  {
    label: 'APG - PLANE - B321',
    value: '456def123abc',
    disabled: null
  },
  {
    label: 'APG - PLANE - C213',
    value: 'abcdef123456',
    disabled: null
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
  @track quoteLineData = testQuoteLineData;
  
  @track apgSelectData = apgSelectOptions;

  selected;

  handleChange(event){
    this.selected = event.target.value;
    let tempTails = this.apgSelectData.map(item =>  ({...item}));
    tempTails.forEach((item) => 
      {
        if (item.value === this.selected){ 
          item.disabled = true;
        }
      }        
    );
    this.apgSelectData = JSON.parse(JSON.stringify(tempTails));
    let tempData = this.quoteLineData.map(item => ({...item}));
    tempData = JSON.parse(JSON.stringify(tempData));
    tempData.forEach((item) => {
      item = JSON.parse(JSON.stringify(item));
      item.sysTailWrappers = this.apgSelectData;
    });
    console.log('placeholdertwo: ',   JSON.parse(JSON.stringify(tempData)));
    this.quoteLineData = JSON.parse(JSON.stringify(tempData));
  }

}
