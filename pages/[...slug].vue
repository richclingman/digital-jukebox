<template>
  <main>

    <div>
      <ContentDoc>
        <template #not-found>
          <h2 class="has-text-centered pt-4">404 - File Not Found</h2>

          <blockquote>
            <p>
              Sorry, it seems that page isn't available.
              <br>
              Perhaps the page moved.
              <br>
              Or a gremlin ate it.
            </p>

            <p>
            Please head to the
              <NuxtLink to="/">Home Page</NuxtLink>
            or select a page from the navigation bar above.
            </p>
          </blockquote>

          <div class="pb-6"></div>

        </template>
      </ContentDoc>
    </div>

  </main>
</template>

<script>

</script>
