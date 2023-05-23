// Load Go Wasm module
async function loadGoWasm() {
  const go = new Go();
  const response = await fetch("go_main.wasm");
  const buffer = await response.arrayBuffer();
  const result = await WebAssembly.instantiate(buffer, go.importObject);
  go.run(result.instance);

  console.log("Go Wasm module loaded.");
}

// Load Rust Wasm module
async function loadRustWasm() {
  const response = await fetch("rust_main.wasm");
  const buffer = await response.arrayBuffer();
  const module = await WebAssembly.compile(buffer);
  const instance = await WebAssembly.instantiate(module, {
    env: {
      console_log: function (ptr, len) {
        const buffer = new Uint8Array(instance.exports.memory.buffer, ptr, len);
        const text = new TextDecoder("utf-8").decode(buffer);
        console.log(text);
      },
    },
  });

  instance.exports.initialize();

  subtract = instance.exports.subtract;

  console.log("Rust Wasm module loaded.");
}

// Entry point: Load both Go and Rust Wasm modules
loadGoWasm();
loadRustWasm();

// Add with Go Wasm
function addWithGo() {
  r.value = add(parseInt(a.value), parseInt(b.value));
}

// Subtract with Rust Wasm
function subtractWithRust() {
  r.value = subtract(parseInt(a.value), parseInt(b.value));
}
