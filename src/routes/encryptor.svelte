<script>
	import crypto from 'crypto';
	import clipboard from 'clipboard';
	import { timesCircle } from 'svelte-awesome/icons';
	import Icon from 'svelte-awesome';
 
	new clipboard('.btn');

	const algorithm = 'aes-256-cbc';
	var text = ""
	var key = "";

	function encrypt(e) {
		e.preventDefault()
		let cipher = crypto.createCipher('aes-256-cbc', Buffer.from(key));
		let encrypted = cipher.update(text);
		encrypted = Buffer.concat([encrypted, cipher.final()]);
		console.log(encrypted.toString('hex'));
	}

	function decrypt(text) {
		let encryptedText = Buffer.from(text, 'hex');
		let decipher = crypto.createDecipher('aes-256-cbc', Buffer.from(key));
		let decrypted = decipher.update(encryptedText);
		decrypted = Buffer.concat([decrypted, decipher.final()]);
		return decrypted.toString();
	}
</script>

<style>
	
	h1 {
		color: white;
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
	<form class="form xycenter" on:submit={encrypt} >
		<h1 style="font-size: calc(12px + 1vw + 1vh)">Encrypt your text</h1>
		<textarea  class="fullwidth" id="salt" type="text" bind:value={text} placeholder="Enter your text" required/>
		<br/>
		<input class="fullwidth" type="text" bind:value={key} placeholder="Enter your password" required/>
		<br/>
		<button type="submit">Encrypt</button>
		
	</form>
	{#if text == "ss"}
		<div class="modal">
		<div class="iconim">
			<Icon scale="2" data={timesCircle} style="position: fixed; top: 20px; right: 20px"/>
		</div>
		<div class="xycenter" style="height: 100%">
			<h1>Your hash :</h1>
			<h3 id="hash" style="max-width: 55%; word-break: break-all;">{text}</h3>
			<button class="btn"  data-clipboard-target="#hash" type="Button" on:click={() => window.alert("Copied to clipboard")} >Copy</button>
		</div>
		</div>
	{/if}

	<footer style="position: fixed; bottom: 0; padding: 16px"> Designed and developed by AzizStark</footer>

</div>

