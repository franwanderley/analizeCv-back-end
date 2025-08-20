export const createCvAnalysisPrompt = (curriculumText: string): string => {
  return `
    Você é um especialista em recrutamento e análise de currículos. Analise o currículo a seguir e forneça um feedback construtivo.
    As dicas devem ser divididas em seções:
    1. **Pontos Fortes**: O que foi bem feito e deve ser mantido.
    2. **Pontos a Melhorar**: O que pode ser aprimorado para deixar o currículo mais forte.
    3. **Sugestões de Formatação**: Dicas sobre a estrutura, clareza e layout.
    
    Observações:
    - Seja sucinto e direto.
    - Evite repetições.
    - Mantenha o feedback claro e objetivo.
    - Adicione espaços entre as seções e não use linhas.
    - Use negrito apenas para destacar os títulos das seções.
    - use o formato Markdown para o feedback.

    O currículo a ser analisado é este:
    """
    ${curriculumText}
    """
  `;
};