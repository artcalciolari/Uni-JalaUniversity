import { Subject, Observable } from "rxjs";

// Interface para o nosso decorator de componente
interface ComponentConfig {
  selector: string;
  template?: string;
  styles?: string[];
}

// Decorator @Component (simulação)
function Component(config: ComponentConfig) {
  return function (target: any) {
    // Adiciona os metadados no construtor/classe
    target.selector = config.selector;
    target.template = config.template || "";
    target.styles = config.styles || [];

    // Simulação dos hooks de ciclo de vida
    // Aqui, apenas imprimimos no console
    target.prototype.ngOnChanges = function () {
      console.log("ngOnChanges chamado");
    };
    target.prototype.ngOnInit = function () {
      console.log("ngOnInit chamado");
    };
    target.prototype.ngAfterViewInit = function () {
      console.log("ngAfterViewInit chamado");
    };
    target.prototype.ngOnDestroy = function () {
      console.log("ngOnDestroy chamado");
    };
  };
}

// Decorator @Output (simulação)
// Usa um Subject para emitir valores como se fosse um Output do Angular
function Output() {
  return function (target: any, propertyKey: string | symbol) {
    const subjectKey = Symbol();

    // Armazene o valor do subject no objeto de destino
    Object.defineProperty(target, subjectKey, {
      writable: true,
      value: new Subject<any>(),
    });

    // Define getter/setter para a propriedade decorada
    Object.defineProperty(target, propertyKey, {
      get: function () {
        return this[subjectKey].asObservable();
      },
      set: function (value: any) {
        this[subjectKey].next(value);
      },
    });
  };
}

interface Card {
  titulo: string;
  estado: "ativo" | "inativo";
}

@Component({
  selector: "app-meu-componente",
  template: `
    <label for="filtro">Filtrar cards:</label>
    <select id="filtro" (change)="filtrar($event.target.value)">
      <option value="todos">Todos</option>
      <option value="ativo">Ativo</option>
      <option value="inativo">Inativo</option>
    </select>

    <div *ngFor="let card of filteredCards">
      <p (click)="selecionarCard(card)">
        {{ card.titulo }} - {{ card.estado }}
      </p>
    </div>
  `,
  styles: [
    `
      /* Estilos simples */
      div {
        margin: 4px;
      }
      p {
        cursor: pointer;
      }
    `,
  ],
})
class MeuComponente {
  // Simulando dados com tipagem correta
  cards: Card[] = [
    { titulo: "Card 1", estado: "ativo" },
    { titulo: "Card 2", estado: "inativo" },
    { titulo: "Card 3", estado: "ativo" },
  ];

  filteredCards: Card[] = this.cards;

  // Decorator @Output (simulando Angular)
  @Output() cardSelecionado!: Observable<Card>;

  constructor() {
    console.log("Construtor chamado");
  }

  // Método que filtra os cards
  filtrar(evento: any | string) {
    let filtro: string;

    if (typeof evento === "object" && evento.target) {
      filtro = evento.target.value;
    } else {
      filtro = evento as string;
    }

    if (filtro === "todos") {
      this.filteredCards = this.cards;
    } else {
      this.filteredCards = this.cards.filter((card) => card.estado === filtro);
    }
  }

  // Ao selecionar um card, emitimos o valor
  selecionarCard(card: any) {
    // Usando o setter normalmente, sem necessidade de cast
    this.cardSelecionado = card;
  }
}

// --- Exemplo de uso/execução (simulação) ---

// Criando instância do componente
const componente = new MeuComponente();

// Mostrando no console as propriedades definidas pelo decorator
console.log("Selector:", (MeuComponente as any).selector);
console.log("Template:", (MeuComponente as any).template);
console.log("Styles:", (MeuComponente as any).styles);

// Inscrevendo-se no "Output" (como se fosse (cardSelecionado)="onCardSelecionado(...)")
componente.cardSelecionado.subscribe((card) => {
  console.log("Card selecionado:", card);
});

// Simulando ciclo de vida
if (typeof componente["ngOnInit"] === "function") {
  componente["ngOnInit"]();
}

// Testando filtro
componente.filtrar("ativo");
console.log("Cards filtrados:", componente.filteredCards);

// Testando emissão de evento
componente.selecionarCard({ titulo: "Card 3", estado: "ativo" });
