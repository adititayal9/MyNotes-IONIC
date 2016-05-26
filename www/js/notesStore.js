angular.module("myNotes.NotesStore",[])
.factory("NotesStore",function(){
  var notes=angular.fromJson(window.localStorage['notes'] || '[]');
  function persist(){
  	window.localStorage['notes']=angular.toJson(notes);
  }

  return {
  list: function(){
    return notes;
  },
  get: function(id){
   for(i = 0; i < notes.length; i++) {
    if(notes[i].id == id) {
      return notes[i];
      }
   }
    return undefined;
  },
  update:function(note){
    for(i = 0; i < notes.length; i++) {
    if(notes[i].id== note.id) {
     notes[i]=note;
     }
    }
    persist();
  },
  create:function(note){
   notes.push(note);
   persist();
  },
  remove:function(noteId){
    for(i = 0; i < notes.length; i++) {
    if(notes[i].id == noteId) {
       notes.splice(i,1);
        persist();
       return;
      }
  }
 },
 move:function(item,fromIndex,toIndex){
  notes.splice(fromIndex,1);
  notes.splice(toIndex,0,item);
  persist;

 }
}
});


