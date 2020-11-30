import handlebars from 'handlebars';
import fs from 'fs';
import IParseMailTemplate from '../models/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default class HandlebarsMailTemplateProvider
  implements IParseMailTemplate {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const template = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(template);
    return parseTemplate(variables);
  }
}
