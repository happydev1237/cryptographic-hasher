<script>
	import crypto from 'crypto';
	import clipboard from 'clipboard';
	import { timesCircle } from 'svelte-awesome/icons';
	import Icon from 'svelte-awesome';
	
	let salt
	let password 
	let hash = ""
	new clipboard('.btn');

	function handleClick(e) {
		e.preventDefault()
    	hash = crypto.pbkdf2Sync(password , salt, 1000, 64, 'sha512').toString('hex');
	}

	function random() {
		salt = crypto.randomBytes(16).toString('hex');
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
		border-radius: 12px;
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

	.subinput{
		margin: 20px;
	}

	.fullwidth{
		width: 100%;
	}

	.modal{
		position: absolute;
		background-color: rgb(23, 10, 56);
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
	<form class="form xycenter" on:submit={handleClick} >
		<h1> Hash your text</h1>

		<div class="subinput fullwidth" style="">
			
			<div style="display: flex;">
				<input id="salt" style="margin-right: 10px" class="fullwidth" type="text" bind:value={salt} placeholder="Enter your salt" required/>
				<button class="btn" type="button" data-clipboard-target="#salt">Copy</button>
			</div>

			<button type="button" style="margin-top: 10px" class="fullwidth"  on:click={random}>Generate random salt</button>
		</div>


		<div class="subinput fullwidth">
			<input class="fullwidth" type="text" bind:value={password} placeholder="Enter your text" required/>
		</div>


		<button type="submit">Hash</button>
		
	</form>

	{#if hash !== ""}
		<div class="modal">
		<div on:click={() => hash = ""} class="iconim">
			<Icon scale="2" data={timesCircle} style="position: fixed; top: 20px; right: 20px"/>
		</div>
		<div class="xycenter" style="height: 100%">
			<h1>Your hash:</h1>
			<h3 id="hash" style="max-width: 55%; word-break: break-all;">{hash}</h3>
			<button class="btn"  data-clipboard-target="#hash" type="Button" on:click={() => window.alert("Copied to clipboard")} >Copy</button>
		</div>
		</div>
	{/if}

</div>

