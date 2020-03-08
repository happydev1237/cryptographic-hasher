<script>
  import { Router, Link, Route } from "svelte-routing";
  import Phasher from "./routes/phasher.svelte";
  import Encryptor from "./routes/encryptor.svelte";
  export let url = "";
</script>

<Router url="{url}">
  <nav style="position: absolute; display: flex; justify-content: space-between; align-items: center; width: 94%; ">
    <img width="120"  src='https://res.cloudinary.com/azizcloud/image/upload/v1583425696/ijvecg0lwgdrs45li7yo.svg' alt='stash' />
    <div>
      <Link to="/">Hasher</Link> |
      <Link to="encryptor">Encryptor</Link>
    </div>
  </nav>
 
  <div style="height: 100%">
    <Route path="/encryptor" noroute component={Encryptor} />
    <Route path="/"><Phasher  /></Route>
  </div>
</Router>