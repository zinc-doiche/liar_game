import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import {Theme, ValidatedTheme} from "../domain/theme";


export class OpenAIManager {
    private openai: OpenAI

    constructor() {
        this.openai = new OpenAI();
    }

    public async createNewTheme({ model, prompt }: { model: string, prompt: string }): Promise<Theme> {
        const schema = z.object({
            theme: z.string(),
            word: z.string(),
            mismatch: z.string(),
        });

        const response = await this.openai.responses.parse({
            model: model,
            input: [
                {
                    role: "system",
                    content:
                        `당신은 라이어 게임의 주제, 제시어, 미스매치를 만들어주는 도우미입니다. 
                         각 단어의 생성은 다음의 규칙을 따릅니다:
                         
                         0. 각 단어는 모두 한국어이어야 하며 일반적으로 많이 사용하는 명칭이어야 한다.
                         1. 라이어 게임의 주제(theme) - 주제는 너무 넓거나 너무 좁지 않아야 한다. 다음은 좋은 예시와 잘못된 예시이다.
                                좋은 예시: 과일, 스포츠, 동계스포츠, 게임, FPS 게임, RPG 게임, 동물, 초식동물, 사물, 도구.
                                잘못된 예시: 비디오 게임, 슈팅 게임.
                         2. 라이어 게임의 제시어(word) - 제시어는 일반적으로 많이 쓰는 단어이다. 
                            제시어는 반드시 주제(theme)에 속하는 단어여야 한다.
                            제시어는 사람들이 일반적으로 모르는 단어일 수 없다. 
                            다음은 '주제: 예시' 쌍으로 묶인 잘못된 예시이다: 
                                '과일: 로즈애플', '스포츠: 소프트볼', '게임: 하츠 오브 아이언', '동물: 벌코두더지', '사물: 책걸상'
                         3. 라이어 게임의 미스매치(mismatch) - 미스매치란 라이어 게임의 라이어가 된 사람이 받게 되는 잘못된 제시어로,
                            제시어(word)와 달라야 한다.
                            미스매치는 반드시 주제(theme)에 속하는 단어여야 한다.
                            어느 정도 서로 구분되는 의미적으로 확실히 다른 단어여야 한다.
                            이하 설정은 제시어(word)와 동일하다.`
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            text: {
                format: zodTextFormat(schema, "theme"),
            },
        });

        return response.output_parsed as Theme;
    }

    public async createTheme({ model, prompt }: { model: string, prompt: string }): Promise<Theme> {
        const schema = z.object({
            theme: z.string(),
            word: z.string(),
            mismatch: z.string(),
        });

        const response = await this.openai.responses.parse({
            model: model,
            input: [
                {
                    role: "system",
                    content:
                        `당신은 주어진 주제(theme)에 맞게 라이어 게임의 제시어, 미스매치를 만들어주는 도우미입니다. 
                         각 단어의 생성은 다음의 규칙을 따릅니다:
                         
                         0. 각 단어는 모두 한국어이어야 하며 일반적으로 많이 사용하는 명칭이어야 한다.
                         1. 라이어 게임의 제시어(word) - 제시어는 일반적으로 많이 쓰는 단어이다. 
                            제시어는 반드시 주제(theme)에 속하는 단어여야 한다.
                            제시어는 사람들이 일반적으로 모르는 단어일 수 없다. 
                            다음은 '주제: 예시' 쌍으로 묶인 잘못된 예시이다: 
                                '과일: 로즈애플', '스포츠: 소프트볼', '게임: 하츠 오브 아이언', '동물: 벌코두더지', '사물: 책걸상'
                         2. 라이어 게임의 미스매치(mismatch) - 미스매치란 라이어 게임의 라이어가 된 사람이 받게 되는 잘못된 제시어로,
                            제시어(word)와 달라야 한다.
                            미스매치는 반드시 주제(theme)에 속하는 단어여야 한다.
                            어느 정도 서로 구분되는 의미적으로 확실히 다른 단어여야 한다.
                            이하 설정은 제시어(word)와 동일하다.`
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            text: {
                format: zodTextFormat(schema, "theme"),
            },
        });

        return response.output_parsed as Theme;
    }

    public async validateTheme(model: string, theme: Theme): Promise<ValidatedTheme> {
        const schema = z.object({
            theme: z.object({
                theme: z.string(),
                word: z.string(),
                mismatch: z.string(),
            }),
            validation: z.string(),
        });

        const response = await this.openai.responses.parse({
            model: model,
            input: [
                {
                    role: "system",
                    content:
                        `당신은 라이어 게임의 주제(theme), 제시어(word), 미스매치(mismatch)를 검증하는 도우미입니다. 
                         
                         미스매치(mismatch)란, 라이어에게만 주어지는 제시어로서, 주제에는 적합하지만 제시어와는 달라야 합니다.
                         주제어와 미스매치는 의미적으로 명확하게 달라야 합니다.
                           
                         각 단어의 검증은 다음을 따릅니다:
                         
                         1. 제시어와 미스매치가 주제에 적합한가?
                         2. 제시어와 미스매치가 일반적으로 많이 알려져 있는가?
                         
                         이후 결과에 따라 다음 절차를 진행합니다.
                         
                         a. 적합하다면 그대로 반환
                         b. 적합하지 않다면 주제를 그대로 두고, 다음을 유의하여 제시어와 미스매치를 수정:
                            - 각 제시어와 미스매치는 모두 한국어이어야 하며 일반적으로 많이 사용하는 명칭이어야 한다.
                            - 제시어와 미스매치는 일반적으로 많이 쓰는 단어이다. 
                            - 제시어와 미스매치는 반드시 주제(theme)에 속하는 단어여야 한다.
                            - 제시어와 미스매치는 사람들이 일반적으로 모르는 단어일 수 없다. 
                            - 다음은 '주제: 단어(제시어 또는 미스매치)' 쌍으로 묶인 잘못된 예시이다: 
                                - '과일: 로즈애플', '스포츠: 소프트볼', '게임: 하츠 오브 아이언', '동물: 벌코두더지', '사물: 책걸상'
                         
                         이후 적합하였다면 validation에 '적합함'을, 적합하지 않았다면 그 이유를 작성하여 반환.`
                },
                {
                    role: "user",
                    content:
                        `검증할 테마는 다음과 같습니다: 
                            - 주제: ${theme.theme}
                            - 제시어: ${theme.word}
                            - 미스매치: ${theme.mismatch}`,
                },
            ],
            text: {
                format: zodTextFormat(schema, "validatedTheme"),
            },
        });

        return response.output_parsed as ValidatedTheme;
    }
}