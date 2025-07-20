import { ChatOpenAI } from "@langchain/openai";
import { Theme } from "../domain/theme";
import { z } from "zod";

export class OpenAIManager {
    private model: ChatOpenAI

    constructor(model: string, temperature: number) {
        this.model = new ChatOpenAI({
            model: model,
            temperature: temperature
        });
    }

    public async createNewTheme(): Promise<Theme> {
        const themeDescription = `라이어 게임의 주제(theme). 주제는 너무 넓지 않아야 한다. 예시: 과일, 스포츠, 게임, 동물, 사물`
        const wordDescription =  `라이어 게임의 제시어(word). 제시어는 일반적으로 많이 쓰는 단어이다. 
                제시어는 사람들이 일반적으로 모르는 단어일 수 없다. 
                다음은 '주제: 예시' 쌍으로 묶인 잘못된 예시이다: 
                '과일: 로즈애플', '스포츠: 소프트볼', '게임: 하츠 오브 아이언', '동물: 벌코두더지', '사물: 책걸상'`.trim()
        const mismatchDescription = `라이어 게임의 미스매치(mismatch). 미스매치란 라이어 게임의 라이어가 된 사람이 받게 되는 잘못된 제시어로, 
                제시어(word)와 달라야 한다. 어느 정도 서로 구분되는 의미적으로 확실히 다른 단어여야 한다.
                이하 설정은 제시어(word)와 동일하다.`.trim()

        const schema = z.object({
            theme: z.string(),
            word: z.string(),
            mismatch: z.string(),
        });

        return await this.model.withStructuredOutput(schema)
            .invoke("20대 남성들이 잘 알 만한 주제와 제시어, 그리고 미스매치로 테마 만들어줘");
    }
}