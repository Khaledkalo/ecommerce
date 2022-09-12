import "./scss/custom.scss"
import "bootstrap/dist/css/bootstrap.min.css";
// import "./css/custom.css";
import "./css/style.css";
import "jquery/dist/jquery.min";
import "popper.js/dist/popper.min";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/js/all.min";
import "webpack-jquery-ui";
import "webpack-jquery-ui/css";
import "jquery-ui-touch-punch/jquery.ui.touch-punch.min.js";


$(function () {
  $('[data-toggle="tooltip"').tooltip();

  $(".add-to-cart-btn").click(function () {
    alert("add product to Warenkorb");
  });

  $("#copyright").text(
    "All rights reserved to the store for the year " + new Date().getFullYear()
  );

  // $('.product-option input[type="radio"]').change(function(){
  $('.product-option input[type="radio"]').on("change", function () {
    $(this).parents(".product-option").siblings().removeClass("active");
    $(this).parents(".product-option").addClass("active");
  });

  $("[data-remove-from-cart]").on("click", function () {
    $(this).parents("[data-product-info]").remove();

    // أعد حساب السعر الإجمالي بعد حذف أحد المُنتجات
    calculateTotalPrice();
  });

  // عندما تتغير كمية المنتج
  $("[data-product-quantity]").on("change", function () {
    // اجلب الكمية الجديدة
    var newQuantity = $(this).val();

    // ابحث عن السّطر الّذي يحتوي معلومات هذا المُنتج
    var $parent = $(this).parents("[data-product-info]");

    // اجلب سعر القطعة الواحدة من معلومات المنتج
    var pricePerUnit = $parent.attr("data-product-price");

    // السعر الإجمالي للمنتج هو سعر القطعة مضروبًا بعددها
    var totalPriceForProduct = newQuantity * pricePerUnit;

    // عين السعر الجديد ضمن خليّة السّعر الإجمالي للمنتج في هذا السطر
    $parent.find(".total-price-for-product").text(totalPriceForProduct + "$");

    // حدث السعر الإجمالي لكل المُنتجات
    calculateTotalPrice();
  });

  function calculateTotalPrice() {
    // أنشئ متغيّرًا جديدًا لحفظ السعر الإجمالي
    var totalPriceForAllProducts = 0;

    // لكل سطر يمثل معلومات المُنتج في الصّفحة
    $("[data-product-info]").each(function () {
      // اجلب سعر القطعة الواحدة من الخاصّية الموافقة
      var pricePerUnit = $(this).attr("data-product-price");

      // اجلب كمية المنتج من حقل اختيار الكمية
      var quantity = $(this).find("[data-product-quantity]").val();

      var totalPriceForProduct = pricePerUnit * quantity;

      // أضف السعر الإجمالي لهذا المنتج إلى السعر الإجمالي لكل المُنتجات، واحفظ القيمة في المتغير نفسه
      totalPriceForAllProducts =
        totalPriceForAllProducts + totalPriceForProduct;
    });

    // حدث السعر الإجمالي لكل المُنتجات في الصفحة
    $("#total-price-for-all-products").text(totalPriceForAllProducts + "$");
  }

  var citiesByCountry = {
    sa: ["Riyadh", "Jeddah"],
    eg: ["Cairo", "Alexandria"],
    jo: ["Amman", "Zarqa"],
    sy: ["Damascus", "Aleppo", "Hama"],
  };

  // when the country changes
  $('#form-checkout select[name="country"]').on("change", function () {
    // get the country code
    var country = $(this).val();

    // Get the cities of this country from the array
    var cities = citiesByCountry[country];

    // clear the list of cities
    $('#form-checkout select[name="city"]').empty();
    $('#form-checkout select[name="city"]').append(
      '<option disabled selected value="">Select City</option>'
    );

    // Add cities to city list
    cities.forEach(function (city) {
      var newOption = $("<option></option>");
      newOption.text(city);
      newOption.val(city);
      $('#form-checkout select[name="city"]').append(newOption);
    });
  });

  // When the payment method changes
  $('#form-checkout input[name="payment_method"]').on("change", function () {
    // Get the currently selected value
    var paymentMethod = $(this).val();

    if (paymentMethod === "on_delivery") {
      // If on receipt, disable credit card fields
      $("#credit-card-info input").prop("disabled", true);
    } else {
      // Otherwise, do it
      $("#credit-card-info input").prop("disabled", false);
    }

    // Alternate credit card information between showing and hiding
    $("#credit-card-info").toggle();
  });

  // search component by price
  $("#price-range").slider({
    range: true,
    min: 50,
    max: 1000,
    step: 50,
    values: [250, 800],
    slide: function (event, ui) {
      $("#price-min").text(ui.values[0]);
      $("#price-max").text(ui.values[1]);
    },
  });
});
