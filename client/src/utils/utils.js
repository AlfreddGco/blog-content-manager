export default class Utils{//utils for managing blogElements
  static findById(arr, id){
    var found = false;
    var counter = 0, index = -1;
    while(!found && counter < arr.length){
      if(arr[counter].id === id){
        index = counter;
        found = true;
      }
      counter += 1;
    }
    return index;
  }
}