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
mockedListSortData.set('RocketRoute|PLANE1|PRODUCT1',rrSelectOptions);
mockedListSortData.set('APG|PLANE1|PRODUCT1', apgSelectOptions);


export default class App extends LightningElement {
  title = "Testing new custom select";

  apgTails = testQuoteLineData;
  tailNameMap = new Map();
  picklistMaps = new Map();
  selected;

  connectedCallback(){

    // Populate tail map with tailId -> tailName so we can easily display the tail name
    let allTails = [];
    allTails = [...apgSelectOptions, ...rrSelectOptions];
    allTails.forEach(item => {
      this.tailNameMap.set(item.value, item.label);
    });

    // Setup the "picklistMap" which will be a map with the following format:
    // key: record.listTag (combination of productFamily_productId_aircraftId)
    // value: a list of available system tails that are compatible with that specific productFamily/productId/aircraftId combination
    let dataClone = [];
    dataClone = JSON.parse(JSON.stringify(this.apgTails));
    dataClone.forEach(item =>{
      if (mockedListSortData.has(item.listTag)){
        this.picklistMaps.set(item.listTag, mockedListSortData.get(item.listTag));
      }
    });

    // Iterate over the quote lines and set the select options to the appropriate list from the 'picklistMap'
    dataClone.forEach(item => {
      item.sysTailWrappers = this.picklistMaps.get(item.listTag);
    })

    // Update the tracked var so it causes a re-render
    this.apgTails = dataClone;

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
      } // End row-level edits   
      let picklistClone = [];
      picklistClone = JSON.parse(JSON.stringify(this.picklistMaps.get(item.listTag))); 
      tailClone = picklistClone.filter(tail => tail.value !== event.target.value);
      this.picklistMaps.set(item.listTag,tailClone);
      item.sysTailWrappers = this.picklistMaps.get(item.listTag);
    });
    
    this.apgTails = JSON.parse(JSON.stringify(dataClone));
    console.log('data: ', this.apgTails);  
    
  }

  handleIconClick(event){
    let dataClone = [];
    let tailClone = [];
    dataClone = JSON.parse(JSON.stringify(this.apgTails));
    let picklistClone = [];
    dataClone.forEach(item => {
      if (item.quoteLineId === event.target.dataset.id){
        item.isRegistered = false;
        picklistClone = JSON.parse(JSON.stringify(this.picklistMaps.get(item.listTag)));
        tailClone = this.picklistMaps.get(item.listTag);
        tailClone.push(item.selectedTail);
        item.selectedTail = {label: '', value: null};
      }
      
    this.picklistMaps.set(item.listTag, tailClone);
    item.sysTailWrappers = this.picklistMaps.get(item.listTag);

    });
    this.apgTails = dataClone;
    
    

   
  }

}
