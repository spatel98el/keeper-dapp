import List "mo:base/List";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";

persistent actor KeeperDapp {
  // create a type for note object
  public type Note = {
    title : Text;
    content : Text;
  };

  // user database , create a HashMap
  // initilizers - size, comparator from Text class ?, hash generator from Text class?
  transient let userDB = HashMap.HashMap<Text, List.List<Note>>(0, Text.equal, Text.hash);

  public query func what() : async Text {
    Debug.print(debug_show ("what():"));
    return "This is ICP backend for keeper app, which will retain the notes for registered users!";
  };

  public query func validateUser(userName : Text) : async Bool {
    Debug.print(debug_show ("validateUser for " # debug_show(userName)));
    let userExists = switch (userDB.get(userName)) {
      case (?_) true; // user found
      case (null) false; // user not found
    };
    Debug.print(debug_show ("User exists: " # debug_show(userExists)));
    return userExists;
  };
  
  public func addNote(userName : Text, titleText : Text, contentText : Text) {
    Debug.print("addNote for " # debug_show(userName));
    Debug.print("Note content : title - " # debug_show(titleText) # " content - " # debug_show(contentText ));

    let newNote : Note = {
      title = titleText;
      content = contentText;
    };

    // serch user in list
    let currentUserNotes = switch (userDB.get(userName)) {
        case (?notes) notes; // got valid user notes
        case (null) List.nil<Note>(); // user note found, add first note
    };

    // update note in the db, push new note to seached user list
    userDB.put(userName, List.push(newNote, currentUserNotes));
    Debug.print(debug_show(userDB.get(userName)));
  };

  // return array of the notes
  public func readNotes(userName : Text) : async [Note] {
    Debug.print(debug_show("read notes for " # debug_show(userName)));
    let currentUserNotes = switch (userDB.get(userName)) {
        case (?notes) notes;
        case (null) List.nil<Note>();
    };
    if(List.isNil(currentUserNotes)) {
      Debug.print("No notes found for user " # debug_show(userName));
    } else {
      Debug.print("Current user notes: " # debug_show(currentUserNotes));
    };

    return List.toArray(currentUserNotes);
  };

  public func deleteNote(userName : Text, titleText : Text) {
    Debug.print("Delete note for " # debug_show(userName) # " with title " # debug_show(titleText));
    // Retrieve current notes for the user
    let currentUserNotes = switch (userDB.get(userName)) {
      case (?notes) notes;
      case (null) List.nil<Note>();
    };
    // Filter out the note with the matching title
    if(List.isNil(currentUserNotes)) {
      Debug.print("No notes found for user " # debug_show(userName));

    } else {
      Debug.print("Current user notes before deletion: " # debug_show(currentUserNotes));

      let filteredNotes = List.filter<Note>(
      currentUserNotes,
      func(note : Note) : Bool {
        note.title != titleText
      }
      );
      // Update userDB with the filtered notes
      userDB.put(userName, filteredNotes);
    };
  };
};
