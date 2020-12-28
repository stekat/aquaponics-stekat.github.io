function insertContact() {
    var c = ['l','a','@','n','h','o','s','.','t','r','e','k','v','-','q','i','p','u','c'];
  
    var hostnameRegexMatch = window.location.hostname.match(/.*?\.(.*)/);

    if (hostnameRegexMatch === null){
      return;
    }
  
    var textMail = c[4]+c[1]+c[0]+c[0]+c[5]+c[13]+c[1]+c[14]+c[17]+c[1]+c[16]+c[5]+c[3]+c[15]+c[18]+c[6]+c[2]+hostnameRegexMatch[1];

    var mailElements = document.getElementsByName("mail");
    var printMailElement = document.getElementById("print-mail");

    mailElements.forEach(mailElement => {
        mailElement.href = "mailto:"+textMail;
    });

    if (printMailElement !== null){
      printMailElement.innerHTML = textMail;
    }
  }
  
  window.addEventListener('load', function() {
    insertContact();
  });