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

let rrSelectOptions = [
  { 
    label: 'RR - PLANE - D323',
    value: 'asdf23523sdfi'
  },
  {
    label: 'RR - PLANE - XF34',
    value: 'an0239fask'
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
    }
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
    }
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
    }
  },
  {
    aircraftId: 'pps3423',
    aircraftName: 'PLANE2',
    isRegistered: false,
    listTag: 'RocketRoute|PLANE1|PRODUCT1',
    productFamily: 'RocketRoute',
    productName: 'PRODUCT1',
    quoteLineId: '3435423f',
    selectedTail: {
      value : '',
      label : ''
    }
  }
];

let mockedListSortData = new Map();
mockedListSortData.set('RocketRoute|PLANE1|PRODUCT1', [{label: 'rrtest', value: 'rrtest1'}, {label: 'rrtest2', value: 'rrtest2'}]);
mockedListSortData.set('APG|PLANE1|PRODUCT1', [{label: 'apgtest1', value: 'apgtest1'}, {label: 'apgtest2', value:'apgtest2'}]);


export default class App extends LightningElement {
  title = "Testing new custom select";

  apgTails = testQuoteLineData;
  tailNameMap = new Map();
  picklistMaps = new Map();
  selected;

  connectedCallback(){
    apgSelectOptions.forEach(item => {
      this.tailNameMap.set(item.value, item.label);
    });

    let dataClone = [];
    dataClone = JSON.parse(JSON.stringify(this.apgTails));
    dataClone.forEach(item =>{
      if (mockedListSortData.has(item.listTag)){
        this.picklistMaps.set(item.listTag, mockedListSortData.get(item.listTag));
      }
    });

    dataClone.forEach(item => {
      item.sysTailWrappers = this.picklistMaps.get(item.listTag);
    })

    this.apgTails = dataClone;
    this.picklistMaps.forEach((item,key) => {
      // let test = JSON.parse(JSON.stringify(item));
      console.log(`Key: ${key}  |  Value: ${item}`);
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
        tailClone = this.picklistMaps.get(item.listTag).filter(item => item.value !== event.target.value);
      } // End row-level edits      
        this.picklistMaps.set(item.listTag,tailClone);
    });
    
    this.apgTails = dataClone;  
    
  }

  handleIconClick(event){
    let dataClone = [];
    let tailClone = [];
    
    dataClone = JSON.parse(JSON.stringify(this.testQuoteLineData));
   
  }

}
