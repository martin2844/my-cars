<script>
    import Layout from './Layout.svelte';
    export let message;
    export let cars;
</script>

<svelte:head>
    <title>My Cars</title>
</svelte:head>

<Layout>
    <div id="fullPage">
        <div class="s1">
            <h1>{message} a</h1>
        </div>
        <div class="s2">
            {#each cars as item, i}
         	<li>{i + 1}: {item.id} x {item.brand} x {item.model}</li>
        {/each}
        </div> 
        <div class="s3">
            <h1>{message}</h1>
        </div>
    </div>
    <script>
          console.log("Initializing")
        new fullpage("#fullPage", {
            autoScrolling: true
        })
        console.log("Constructor Passed")
    </script>
</Layout>

