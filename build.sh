rm -r ./bridge/*.wasm
rustc --target wasm32-unknown-unknown --crate-type cdylib ./rust/main.rs -o ./bridge/rust_main.wasm
GOOS=js GOARCH=wasm go build -o ./bridge/go_main.wasm ./go/main.go
