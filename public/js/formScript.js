//Save typing and Space.
//Translate document.getElementById everywhere there is an _ call
//Avoid typing document.getElementById in the code
function _(id){
  return document.getElementById(id);
}

function submitForm() {
  _("mybtn").disabled = true;
  _("status").innerHTML = 'please wait ...';
  //Alows us to append new key value pairs
  var formdata = new FormData();
  formdata.append( "name", _("name").value );
  formdata.append( "email", _("email").value);
  formdata.append( "m", _("m").value);

  var ajax = new XMLHttpRequest();
  //Post data to php script
  ajax.open( "POST", "parser.php" );
  ajax.onreadystatechange = function(){
    if(ajax.readyState == 4 && ajax.status == 200){
      if(ajax.responseText == "success"){
        _("my_form").innerHTML = '<h2> Thanks ' + _("name").value + ', your Message is sent.</h2>';
      }
      else {
        _("status").innerHTML = ajax.responseText;
        _("mybtn").disabled = false;
      }
    }
  }
  ajax.send( formdata );
}
