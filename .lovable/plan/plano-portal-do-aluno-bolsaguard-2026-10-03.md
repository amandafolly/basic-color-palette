# Plano — Portal do Aluno BolsaID

## Resultado
Criar uma demonstração interativa do portal do aluno na página inicial, baseada no texto enviado. O fluxo inclui entrada simulada, painel acadêmico e financeiro, pagamento demonstrativo em reais e histórico de mensalidades e renovações.

## Interface
- Paleta em cinza e azul-marinho arroxeado como destaque, sem roxo vivo; opção para alternar entre modo claro e escuro. Verde discreto para estados positivos.
- Fontes básicas sem serifa, cartões discretos e botões simples; sem emojis, gradientes, brilho neon, bolhas ou efeitos 3D.
- Barra lateral fixa em telas grandes e navegação adaptada para celular, com Início, Pagamento, Histórico e Perfil; controle acessível de tema claro/escuro.
- Exibir os dados de exemplo do briefing: Ana, e-mail institucional, bolsa ProUni 50%, renovação, desconto recebido no mês, fatura de R$ 1.000, desconto de R$ 500 e total de R$ 500.

## Interações
- Botão de entrada abre o painel com uma carteira de exemplo; a interface deixará claro que se trata de uma demonstração, sem autenticação ou carteira real.
- Navegação entre painel, pagamento, histórico e perfil usando estado React.
- Pagamento simulado atualiza o estado da fatura e acrescenta um registro ao histórico, sem transferir fundos nem afirmar confirmação real na Solana.
- Histórico mostra renovações e transações de exemplo com identificadores marcados como demonstrativos, evitando links que aleguem comprovação inexistente.

## Implementação técnica
- Concentrar o componente e seus dados/estados em um único arquivo React, como solicitado, usando Tailwind e ícones Lucide; ajustar apenas os tokens globais necessários ao visual.
- Incluir metadados próprios da página e verificar o fluxo de entrada, pagamento e histórico em desktop e celular.
- Não habilitar serviços externos nem persistência: esta versão é uma demonstração, não uma integração on-chain.
