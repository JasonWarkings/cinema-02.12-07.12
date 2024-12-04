<script setup>

</script>
<template>
  <div class="row">
    <div class="col-md-2">
      <h2> 4.8 </h2> </div>
    <div class="col-md-8">
      <iframe width="750" height="450" src="https://www.youtube.com/watch?v=1GAH1DWzWG0&t=2737s"></iframe>
    </div>
    <div class="col-md-2">
      <ul class="rating-stars">
        <li class="star-item"><a href="" class="star-link" data-bs-toggle="tooltip" title="5"><i class="bi bi-star"></i></a></li>
        <li class="star-item"><a href="" class="star-link" data-bs-toggle="tooltip" title="5"><i class="bi bi-star"></i></a></li>
        <li class="star-item"><a href="" class="star-link" data-bs-toggle="tooltip" title="5"><i class="bi bi-star"></i></a></li>
        <li class="star-item"><a href="" class="star-link" data-bs-toggle="tooltip" title="5"><i class="bi bi-star"></i></a></li>
        <li class="star-item"><a href="" class="star-link" data-bs-toggle="tooltip" title="5"><i class="bi bi-star"></i></a></li>
      </ul>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <h1>Matrix</h1>
    </div>
    <div class="col-vd-8 fs-4">
      120 min. | USA | 1999 | 16+ | 03.12.2024 | Action,Fantastic
    </div>
    <div class="col-md-4 fs-4 text-end">
      <a href="#">Kinopoisk</a>
    </div>
  </div>
  <div class="row-mt-5 fs-4">
    <div class="col-md-10">
      <label for="exampleFormControlTextarea1" class="form-label">Add review</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
    <div class="col-md-2 d-flex flex-column-reverse">
      <button class="btn btn-outline-success">Send</button>
    </div>
  </div>
  <div class="row">
    <div class="col-12 fs-4 mt-2">Reviews</div>
    <div class="row">
      <div class="col">
        <div class="row">
          <div class="col-md-10 fw-bold fs-5">Ivan</div>
          <div class="col-md-2 text-end">04.12.2024</div>
        </div>
        <div class="row">
          <div class="col fs-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aspernatur, atque autem consectetur et fugit modi odit pariatur quae? Eius, nihil, voluptate. Adipisci cupiditate eius iusto optio provident quae quaerat?</div>
        </div>
      </div>
      <div class="col-12">
        <hr class="border border-success border-2 opacity-50">
      </div>
    </div>
  </div>
</template>
<style scoped>
.rating-stars {
  list-style-type: none;
}
.star-item {
  font-size: 2.5rem;
}
.star-link {
  color: #490495;
}
.star-link:hover {
  color: #ff00cd;
}
</style>