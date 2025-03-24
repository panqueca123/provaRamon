const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')



const teclasPressionadas = {
    KeyW: false,
    KeyS: false,
    KeyD: false,
    KeyA: false
};
document.addEventListener('keydown', (e) => {
    for (let tecla in teclasPressionadas) {
        if (teclasPressionadas.hasOwnProperty(e.code)) {
            teclasPressionadas[tecla] = false;
        }
    }
    if (teclasPressionadas.hasOwnProperty(e.code)) {
        teclasPressionadas[e.code] = true;
    }
});


class Entidade {
    constructor(x, y, largura, altura) {
        this.x = x
        this.y = y
        this.largura = largura
        this.altura = altura
    }
}


class Cobra extends Entidade {
    #ponto = 0
    constructor(x, y, largura, altura) {
        super(x, y, largura, altura)
        this.corpo = [{ x: this.x, y: this.y }]
        this.tamanho = 1


    }
    desenhar() {
        ctx.fillStyle = 'white'
        for(let i = 0; i < this.tamanho; i++){
            ctx.fillRect(this.x, this.y, this.largura, this.altura)
        }
    }
    atualizar() {
        if (teclasPressionadas.KeyW) {
            this.y -= 7
        } else if (teclasPressionadas.KeyS) {
            this.y += 7
        } else if (teclasPressionadas.KeyA) {
            this.x -= 7
        } else if (teclasPressionadas.KeyD) {
            this.x += 7
        }
       

    }

    verificarColisao(comida) {
        if (
            this.x < comida.x + comida.largura &&
            this.x + this.largura > comida.x &&
            this.y < comida.y + comida.altura &&
            this.y + this.altura > comida.y
        ) {
            this.#houveColisao(comida)
        }
    }
    #houveColisao(comida) {
        comida.x = Math.random() * canvas.width - 10
        comida.y = Math.random() * canvas.height - 10
        this.#ponto += 1
    }
    get ponto(){
        return this.#ponto = 0
    }

    resetPonto(){
       return this.#ponto = 0
    }

    colisaoBorda() {
        if (this.x < 0 || this.x > canvas.width - this.largura || this.y < 0 || this.y > canvas.height - this.altura) {
            this.#gameOver()

        }

    }


    #gameOver() {
        alert(`Fim de jogo! Pontuação: ${ponto}`)
        location.reload()
    }
}





class Comida extends Entidade {
    constructor() {
        super(Math.random() * canvas.width - 10, Math.random() * canvas.height - 10, 20, 20)
    }
    desenhar() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
    comeu(cobra) {
        if (
            cobra.x < this.x + this.largura &&
            cobra.x + cobra.largura > this.x &&
            cobra.y < this.y + this.altura &&
            cobra.y + cobra.altura > this.y
        ) {
            this.x = Math.random() * (canvas.width - 10)
            this.y = Math.random() * (canvas.height - 10)
            ponto + 1
        }
    }
}


const cobra = new Cobra(100, 200, 20, 20)
const comida = new Comida()


function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    cobra.desenhar()
    cobra.atualizar()
    comida.desenhar()
    cobra.resetPonto()
    cobra.verificarColisao(comida)
    comida.comeu(cobra)
    cobra.colisaoBorda()
    ctx.fillStyle = 'white'
    ctx.font = '20px Arial'
    ctx.fillText(`Pontuação: ${cobra.ponto}`, 10, 30)

    requestAnimationFrame(loop)
}
loop()