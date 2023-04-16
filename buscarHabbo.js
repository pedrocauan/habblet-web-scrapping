// login amora96
// senha pato12

/**
 * =====================================================
 * |                 W E L C O M E                     |
 * =====================================================
 * | OLÁ, SEJA BEM VINDO AO CÓDIGO FONTE. EU SOU 0     |
 * | 98NOOT. CRIADOR DO BOT.                           |
 * |                                                   |
 * | CASO ESTEJA PERDIDO.. EU TAMBÉM ESTOU !!          |
 * | CRIEI O BOT EM UM MOMENTO DE TÉDIO, MAS           |
 * | AQUI ESTÃO ALGUMAS ESPECIFICAÇÕES:                |
 * |                                                   |
 * | - A variavel args[0] guarda o player a ser        |
 * |   pesquisado quando você digita:                  |
 * |   node buscarHabbo.js <player>                    |
 * | - O Bot só funciona se o player existir.          |
 * | - As vezes o bot falha e da  um erro estranho.    | 
 * | - Sinta-se livre para mexer e aprimorar o código. |
 * | - SE DER ERRO, RODA DENOVO Q UMA HORA FUNCIONA    |
 * | - O código inicia lá em baixo.                    | 
 * | - Peço que não note os erros de lógica, criei     |
 * |    sem pensar em otimização.                      |  
 * | - O bot pode ser aprimorado para mais funções.    |
 * -----------------------------------------------------
 * |                 8====D ~~~> O:                    |
 * |                                                   |
 * -----------------------------------------------------
 */
const args = process.argv.slice(2);
const userLogin = `amora96`;
const userPassword = `pato12`;
const searchUser = args[0];

//função de erro
const exit = (err) => console.log(err);

const login = async (page) => {
    //usuario
    await page.waitForTimeout(5000);
    const login = await page.$("input.rounded-input.blue-active.username");
    if (!login) return 0;
    login.type(userLogin);

    //senha
    await page.waitForTimeout(1000);
    const password = await page.$(`input[name="credentials_password"]`);
    await password.type(userPassword);
    await page.waitForTimeout(500);
    //clica no botao login
    await page.click(".rounded-button.blue.plain.submit-form.g-recaptcha.default-prevent");
}

const runBot = () => {
    const puppeteer = require("puppeteer");
    (
        async () => {
            //abre navegador
            const browser = await puppeteer.launch({ headless: false });
            //abre nova pagina
            const page = await browser.newPage();
            //vai pro site
            await page.goto('https://www.habblet.city/');
            // tamanho da janela
            await page.setViewport({ width: 1280, height: 700 });
            //procura um erro
            if (page.$(`div[data-type="error"].notification-container`)) {
                await login(page);
                //entra no hotel
                await page.waitForTimeout(4000);
                const game = await browser.newPage();
                await game.goto("https://www.habblet.city/hotelv2");
                await game.setViewport({ width: 1280, height: 1024 });

                //fecha ad
                const ad1 = game.$("#closeAd1");
                const ad2 = game.$("#closeAd2");

                await game.waitForTimeout(2000);
                game.click("#closeAd1");
                await game.waitForTimeout(2000);
                game.click("#closeAd2");

                //seleciona barra de pesquisar habbo
                await game.waitForSelector(".cursor-pointer.navigation-item.icon.icon-friendsearch");
                await game.waitForTimeout(2000);
                await game.click(".cursor-pointer.navigation-item.icon.icon-friendsearch");

                //pesquisa usuario
                await game.waitForTimeout(5000);
                const search = await game.$(`input.search-input.goldfish`);
                await game.waitForTimeout(5000);
                await search.type(searchUser);
                await game.waitForTimeout(3000);
                await game.click("div.btn-search.goldfish.cursor-pointer");
                await game.waitForTimeout(4000);
                await game.click("div.cursor-pointer.nitro-friends-spritesheet.icon-profile-sm");
               

                //pega nome, missao
                await game.waitForTimeout(3000);
                const user = {
                    nome: await game.$eval(".d-flex.overflow-hidden.flex-column.gap-2.container-fluid.content-area div.d-inline.text-black.fw-bold", value => value.innerHTML),
                    missao: await game.$$eval(".d-flex.overflow-hidden.flex-column.gap-2.container-fluid.content-area div.d-inline.text-black.small", value => value[0].innerHTML),
                    criacao: await game.$$eval(".d-flex.overflow-hidden.flex-column.gap-2.container-fluid.content-area div.d-inline.text-black.small span", value => value[0].innerHTML.substring(0, value[0].innerHTML.indexOf("<")))

                }
                console.log(user);
                await browser.close(); //fecha o navegador
            } else {
                exit("aa");
            }
        }
    )()

}

// =========== O CÓDIGO INICIA AQUI =======
const init = () => {
    if (!args[0])
        return exit("player pesquisado nao passado");
    runBot();
}

init();
