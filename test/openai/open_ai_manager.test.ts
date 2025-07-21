import { OpenAIManager } from "../../src/openai/open_ai_manager";
import { openAIToken } from "../../config.json";

process.env.OPENAI_API_KEY = openAIToken;

const openAIManager = new OpenAIManager();


test('createNewTheme', async () => {
    const theme = await openAIManager.createNewTheme({
        model: 'o4-mini-2025-04-16',
        prompt: "한국의 20대 남성들이 잘 알 만한 주제와 제시어, 그리고 미스매치로 테마 만들어줘",
    });

    console.log(theme);

    expect(theme).toBeDefined();
    expect(theme.theme).toBeDefined();
    expect(theme.word).toBeDefined();
    expect(theme.mismatch).toBeDefined();

    const validatedTheme = await openAIManager.validateTheme('o4-mini-2025-04-16', theme);

    console.log(validatedTheme);

    expect(validatedTheme).toBeDefined();
    expect(validatedTheme.theme).toBeDefined();
    expect(validatedTheme.validation).toBeDefined();
}, 1000 * 30);


test('createTheme', async () => {
    const themeName = '포켓몬스터';
    const theme = await openAIManager.createTheme({
        model: 'o4-mini-2025-04-16',
        prompt: `한국의 20대 남성들이 잘 알 만한 제시어, 그리고 미스매치로 테마 만들어줘. 주제(theme)는 '${themeName}'.`,
    });

    console.log(theme);

    expect(theme).toBeDefined();
    expect(theme.theme).toBeDefined();
    expect(theme.word).toBeDefined();
    expect(theme.mismatch).toBeDefined();

    const validatedTheme = await openAIManager.validateTheme('o4-mini-2025-04-16', theme);

    console.log(validatedTheme);

    expect(validatedTheme).toBeDefined();
    expect(validatedTheme.theme).toBeDefined();
    expect(validatedTheme.validation).toBeDefined();
}, 1000 * 60);