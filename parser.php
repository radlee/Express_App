<?php
if( isset($_POST['name']) && isset($_POST['email']) && isset($_POST['m']) ){
  $name = $_POST['name'];
  $email = $_POST['email'];
  $m = nl2br($_POST['m']);
  $to = "lolito@projectcodex.co";
  $from = $email;
  $subject = 'Contact Form Message';
  $message = '<b>Name:</b> '.$name.' <br><b>Email:</b> '.$email.' <p>'.$m.'</p>';
  $headers = "From: $from\n";
  $headers .= "MINE-Version: 1.0\n";
  $headers .= "Content-type: text/html; charset=iso-8859-1\n";
  if( mail($to, $subject, $message, $headers) ){
    echo "success";
  }
  else {
    echo "The server failed to send the message. Please try again later.";
  }
}
?>
