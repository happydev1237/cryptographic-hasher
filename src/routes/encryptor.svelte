<script>
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

</script>

<style>
	
	h1 {
		color: white;
	}

	.switch {
	position: relative;
	display: inline-block;
	width: 60px;
	height: 34px;
	}

	.switch input { 
	opacity: 0;
	width: 0;
	height: 0;
	}

	.slider {
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #ccc;
	-webkit-transition: .4s;
	transition: .4s;
	}

	.slider:before {
	position: absolute;
	content: "";
	height: 26px;
	width: 26px;
	left: 4px;
	bottom: 4px;
	background-color: white;
	-webkit-transition: .4s;
	transition: .4s;
	}

	input:checked + .slider {
	background-color: #ffc400;
	}

	input:focus + .slider {
	box-shadow: 0 0 1px #2196F3;
	}

	input:checked + .slider:before {
	-webkit-transform: translateX(26px);
	-ms-transform: translateX(26px);
	transform: translateX(26px);
	}

	.xycenter{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.form{
		padding: 30px;
		background-color: #006D7E;
	}

	.contents{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.fullwidth{
		width: 100%;
	}

	.modal{
		position: absolute;
		background-color: #373342;
		padding: 20px;
		width: 100%;
		height: 100%;
		border-radius: 10px;
	}

	.iconim:hover{
		color: chartreuse;
	}

</style>
<div class="contents">
	<form class="form xycenter" on:submit={doCrypto} >
		<label class="switch">
			<input on:change={stateChange} type="checkbox">
			<span class="slider"></span>
		</label>
		<h1 style="font-size: calc(12px + 1vw + 1vh)">{state} your text</h1>
		<textarea  class="fullwidth" id="salt" type="text" bind:value={text} placeholder={msgbox} required/>
		<br/>
		<input class="fullwidth" type="password" bind:value={key} placeholder="Enter your password" required/>
		<br/>
		<button type="submit">{state}</button>
	</form>
	<code style="color:  chartreuse; padding-top: 10px">AES 256-bit Encryption</code>
	{#if result !== ""}
		<div class="modal">
			<div class="iconim" on:click={() => result = ""}>
				<Icon scale="2" data={timesCircle} style="position: fixed; top: 20px; right: 20px"/>
			</div>
			<div class="xycenter" style="height: 100%">
				<h1>Your {state}ed text</h1>
				<h3 id="hash" style="max-width: 55%; word-break: break-all;">{result}</h3>
				<button class="btn"  data-clipboard-target="#hash" type="Button" on:click={() => window.alert("Copied to clipboard")} >Copy</button>
			</div>
		</div>
	{/if}

	<footer style="position: fixed; bottom: 0; padding: 16px"> Designed and developed by <span style="color:  chartreuse">AzizStark</span></footer>

</div>

