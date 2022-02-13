<script>
  import Layout from './Layout.svelte';
  export let cars;
 
</script>

<svelte:head>
  <title>My Cars</title>
</svelte:head>

<Layout>
  <div id="fullpage">
    <div class="section sectionl2"  id='section'>
      <div class="content">
          <h1 class="title">Initial Section</h1>
      </div>
    </div>
    {#each cars as car, i}
      <div class={"section " + (i % 2 === 0 ? "sectionl1" : "sectionl2")}  id={'section' + i}>
        <div class="content">
          <div class="inner-content">
            <h1 class="title">{car.model}</h1>
            <h4 class="brand">{car.brand}</h4>
            <p>{car.description}</p>
            <p><strong>Comprado:</strong> {car.bought}</p>
            <p><strong>Vendido:</strong> {car.sold}</p>
            <div class="image-container">
            {#each car.images as src}
              <a href={src} class="glightbox3 thumbnail" data-gallery="gallery1">
                <img class="thumbnail" {src} alt="Car" />
              </a>
            {/each}
          </div>
          </div>
        
        </div>
      </div>
    {/each}
  </div>
  <div id="theme" style="display:none;">light</div>
  <div id="raw-data" style="display:none;">{JSON.stringify(cars)}</div>
  <script>
    const rawData = JSON.parse(document.getElementById("raw-data").innerText);
    fullpage.initialize('#fullpage', {
      anchors: ["0a", ...rawData.map((a, i) => `${i + 1}a` )],
      menu: '#menu',
      css3: true,
    });

    const lightbox = GLightbox({
    touchNavigation: true,
    loop: true,
    autoplayVideos: true,
    selector: ".glightbox3"
    });


  </script>
</Layout>
