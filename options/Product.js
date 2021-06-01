app.component('product', {
  template: /* vue-html */ `
    <section class="product">
    <div class="product__thumbnails">
      <div 
      v-for="(image, index) in product.images"
      :key="image.thumbnail"
      class="thumb" 
      :class="{ active: activeImage === index}" 
      :style="{ backgroundImage: 'url(' + product.images[index].thumbnail + ')'}"
      @click="activeImage = index"
      >
    </div>
    </div>
    <div class="product__image">
      <img 
      :src="product.images[activeImage].image" 
      :alt="product.name" />
    </div>
  </section>
  <section class="description">
    <h4>
      {{ product.name.toUpperCase() }} {{ product.stock === 0 ? "😢" : "😎"}}
    </h4>
    <span class="badge new" v-if="product.new">
      New
    </span>
    <span class="badge offer" v-if="product.offer">
      Offer
    </span>
    <p class="description__status" v-if="product.stock === 3">
      Few units left
    </p>
    <p class="description__status" v-else-if="product.stock === 2">
      The product is about to be finished
    </p>
    <p class="description_status" v-else-if="product.stock === 1">
      last unit available
    </p>
    <p class="description_status" v-else>
      No products available
    </p>
    <p class="description__price" :style="{ color: price_color }">
      {{ product.name }} - $ {{ new Intl.NumberFormat("en-EN").format(product.price)}}
    </p>
    <p class="description__content">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
      atque dolorum corporis, reiciendis eaque temporibus quod magnam amet
      ea natus delectus? Aut placeat ipsam minus labore voluptas. Porro,
      vel aliquid!
    </p>
    <div class="discount">
      <span>Discount Code:</span>
      <input 
      type="text" 
      placeholder="Enter your code"
      @keyup.enter="applyDiscount($event)"
      />
    </div>
    <button 
    :disabled="product.stock === 0"
    @click="sendToCart()"
    >Add to cart</button>
  </section>
  
  `,

  props: ["product"],
  emits: ["sendtocart"],
  data() {
    return {
      activeImage: 0,
      discountCodes: ["PLATZI20", "IOSAMUEL"],
      // price_color: "rgb(104, 104, 209)"
    };
  },
  methods: {
    applyDiscount(event) {
      const discountCodeIndex = this.discountCodes.indexOf(event.target.value);
      if (discountCodeIndex >= 0) {
        this.product.price *= 50 / 100;
        this.discountCodes.splice(discountCodeIndex, 1);
      }
    },
    sendToCart() {
      this.$emit("sendtocart", this.product);
    }
  },
  watch: {
    activeImage(value, oldValue) {
      console.log(value, oldValue);
    },
    // "product.stock"(stock) {
    //   if (stock <= 1) {
    //     this.price_color = "rgb(188, 30, 67)"
    //   }
    // }
  },
  computed: {
    price_color() {
      if (this.product.stock < 1) {
        return "rgb(188, 30, 67)";
      }
      return "rgb(104, 104, 209)"
    }
  }
});