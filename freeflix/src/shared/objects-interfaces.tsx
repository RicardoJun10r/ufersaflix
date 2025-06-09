export type Genero = "DRAMA" | "ACAO"

export interface Obra {
    id: string;
    titulo: string;
    descricao: string;
    capaUrl: string;
    generos: Genero[];
    classificacaoIndicativa: string;
    anoLancamento: number;
    avaliacaoMedia: number;
    elenco: string[];
    diretor: string;
    trailerUrl?: string;
    duracaoTotalMinutos?: number;
}

export interface Filme extends Obra {
    duracaoMinutos: number;
}

export interface Serie extends Obra {
    numeroTemporadas: number;
    episodiosPorTemporada: { [key: number]: number };
}
