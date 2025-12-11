#include <emscripten/emscripten.h>

extern "C" {
    // Exporta a função para ser chamada pelo JS
    EMSCRIPTEN_KEEPALIVE double calculate(double a, double b, int op) {
        // op: 0=soma, 1=subtração, 2=multiplicação, 3=divisão
        switch(op) {
            case 0: return a + b;
            case 1: return a - b;
            case 2: return a * b;
            case 3: return (b != 0) ? a / b : 0.0;
            default: return 0.0;
        }
    }
}