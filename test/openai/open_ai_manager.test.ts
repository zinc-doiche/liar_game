import {OpenAIManager} from "../../src/openai/open_ai_manager";
import {openAIToken} from "../../config.json";

process.env.OPENAI_API_KEY = openAIToken;

const openAIManager = new OpenAIManager('o4-mini', 1);


test('createNewTheme', async () => {
    const theme = await openAIManager.createNewTheme();

    console.log(theme);

    expect(theme).toBeDefined();
    expect(theme.theme).toBeDefined();
    expect(theme.word).toBeDefined();
    expect(theme.mismatch).toBeDefined();
});

