import { OpenAIManager } from "../../src/openai/open_ai_manager";
import { openAIToken } from "../../config.json";

process.env.OPENAI_API_KEY = openAIToken;

const openAIManager = new OpenAIManager();


test('createNewTheme', async () => {
    const theme = await openAIManager.createNewTheme('4o-mini');

    console.log(theme);

    expect(theme).toBeDefined();
    expect(theme.theme).toBeDefined();
    expect(theme.word).toBeDefined();
    expect(theme.mismatch).toBeDefined();
});

