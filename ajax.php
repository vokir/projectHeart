<?php
    $msg_box = ""; // в этой переменной будем хранить сообщения формы
    // собираем данные из формы
    $message  = "Имя пользователя: " . $_POST['name'] . "<br/>";
    $message .= "Телефон пользователя: " . $_POST['phone'] . "<br/>";
    $message .= "Текст письма: " . $_POST['text'];  
    
    send_mail($message); // отправим письмо
    // выведем сообщение об успехе
    $msg_box = "успех";
 
    // делаем ответ на клиентскую часть в формате JSON
    echo json_encode(array(
        'result' => $msg_box
    ));
     
     
    // функция отправки письма
    function send_mail($message){
        // почта, на которую придет письмо
        $mail_to = "volkodav.lol31@gmail.com"; 
        // тема письма
        $subject = $message;
         
        // заголовок письма
        $headers= "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
        $headers .= "From: Тестовое письмо <no-reply@test.com>\r\n"; // от кого письмо
         
        // отправляем письмо 
        mail($mail_to, $subject, $message, $headers);
    }
     
?>