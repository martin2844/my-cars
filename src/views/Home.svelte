<script>
  import Layout from './Layout.svelte';
  export let cars;
</script>

<svelte:head>
  <title>My Cars</title>
</svelte:head>

<Layout>
  <div id="fullpage">
    <div class="section sectionl2" id="section">
      <div class="content home">
        <h1 class="title">Welcome</h1>
        <div class="subcontent">
          <p>
            Amo los autos, esto es una pequeña aplicación que muestra
            basicamente una base de datos SQLite con los autos que tuve.
          </p>
          <p>
            La idea era probar SQLite, con NestJS usando Svelte como un view
            layer.
          </p>
          <p>
            El código esta en <a href="https://github.com/martin2844/my-cars"
              >github</a
            >, Los docs de la api se encuentran <a href="/api-docs">acá</a>,
            hechos con swagger y la base de SQlite la podes bajar
            <a href="/db/mycars.db">acá</a>
          </p>
        </div>
        <div class="arrow bounce">
          <h1 class="arrow-icon">></h1>
        </div>
      </div>
    </div>
    {#each cars as car, i}
      <div
        class={'section ' + (i % 2 === 0 ? 'sectionl1' : 'sectionl2')}
        id={'section' + i}
      >
        <div class="content cars">
          <div class="inner-content">
            <h1 class="title">{car.model}</h1>
            <h4 class="brand">{car.brand}</h4>
            <p>{car.description}</p>
            <p><strong>Comprado:</strong> {car.bought}</p>
            <p><strong>Vendido:</strong> {car.sold}</p>
            <div class="image-container">
              {#each car.images as src}
                <a
                  href={src}
                  class="glightbox3 thumbnail"
                  data-gallery="gallery1"
                >
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
    const rawData = JSON.parse(document.getElementById('raw-data').innerText);
    fullpage.initialize('#fullpage', {
      anchors: ['0a', ...rawData.map((a, i) => `${i + 1}a`)],
      menu: '#menu',
      css3: true,
    });

    const lightbox = GLightbox({
      touchNavigation: true,
      loop: true,
      autoplayVideos: true,
      selector: '.glightbox3',
    });
  </script>
</Layout>
