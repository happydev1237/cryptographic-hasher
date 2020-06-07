    import crypto from 'crypto';
	import clipboard from 'clipboard';
	import { timesCircle } from 'svelte-awesome/icons';
	import Icon from 'svelte-awesome';
 
	new clipboard('.btn');

	var state = "Encrypt";
	var msgbox = "Enter your text"
	var text = "";
	var key = "";
	var result = ""

	function stateChange(e) {
		e.preventDefault()
		if (state === "Encrypt"){
			state = "Decrypt"
			msgbox = "Enter your Encrypted text"
			text = "";
			key = "";
		}
		else{
			state = "Encrypt"
			msgbox = "Enter your text"
			text = "";
			key = "";
		}
	}

	const algorithm = 'aes-256-cbc';


	function doCrypto (e) {
		e.preventDefault()
		if (state === "Encrypt"){
			let cipher = crypto.createCipher('aes-256-cbc', Buffer.from(key));
			let encrypted = cipher.update(text);
			encrypted = Buffer.concat([encrypted, cipher.final()]);
			result =  encrypted.toString('hex');
		}

		else{
			let decipher = ""
			let decrypted = ""
			let encryptedText = ""
			try {
				encryptedText = Buffer.from(text, 'hex');
				try {
					decipher = crypto.createDecipher('aes-256-cbc', Buffer.from(key));
					decrypted = decipher.update(encryptedText)
					decrypted = Buffer.concat([decrypted, decipher.final()]);
					result = decrypted.toString();
				}
				catch (err){
					window.alert("Invalid Password")
				}
			}
			catch(err){
				window.alert("Error: Please enter a valid Encrypted text")
			}
		}
	}
