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

  selected;

  handleChange(event){
    console.log(event);
    this.selected = event.target.value;
  }

}
