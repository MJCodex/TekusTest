'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">tekus-test documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Escribe para buscar"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Comenzando</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Descripción general
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>Léeme
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencias
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Propiedades
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Módulos</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-108d9879ac898b7d2c795f456caad83449f8313fed1aa5dcb68233f8a9d670c8d350cb4199189c3816e2aa6d3ee8d3d382e4d706cf647bc807f91351af8086d0"' : 'data-target="#xs-components-links-module-AppModule-108d9879ac898b7d2c795f456caad83449f8313fed1aa5dcb68233f8a9d670c8d350cb4199189c3816e2aa6d3ee8d3d382e4d706cf647bc807f91351af8086d0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-108d9879ac898b7d2c795f456caad83449f8313fed1aa5dcb68233f8a9d670c8d350cb4199189c3816e2aa6d3ee8d3d382e4d706cf647bc807f91351af8086d0"' :
                                            'id="xs-components-links-module-AppModule-108d9879ac898b7d2c795f456caad83449f8313fed1aa5dcb68233f8a9d670c8d350cb4199189c3816e2aa6d3ee8d3d382e4d706cf647bc807f91351af8086d0"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DynamicTableModule.html" data-type="entity-link" >DynamicTableModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DynamicTableModule-5ab7fef4f7f1d5872e8fdd7312826cf03d615df94b0c30925c833f13bc533c4551e3b63ec566e55cc28326ab3a73620c87866574dc3152073c4138d79adcea76"' : 'data-target="#xs-components-links-module-DynamicTableModule-5ab7fef4f7f1d5872e8fdd7312826cf03d615df94b0c30925c833f13bc533c4551e3b63ec566e55cc28326ab3a73620c87866574dc3152073c4138d79adcea76"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DynamicTableModule-5ab7fef4f7f1d5872e8fdd7312826cf03d615df94b0c30925c833f13bc533c4551e3b63ec566e55cc28326ab3a73620c87866574dc3152073c4138d79adcea76"' :
                                            'id="xs-components-links-module-DynamicTableModule-5ab7fef4f7f1d5872e8fdd7312826cf03d615df94b0c30925c833f13bc533c4551e3b63ec566e55cc28326ab3a73620c87866574dc3152073c4138d79adcea76"' }>
                                            <li class="link">
                                                <a href="components/DynamicColumnComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DynamicColumnComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DynamicTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DynamicTableComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ErrorsHandlerModule.html" data-type="entity-link" >ErrorsHandlerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ErrorsHandlerModule-bd4629167157c1ae31179445add27c2581d966b16be12676a05fc84266d892b3ce96d80865dd0b618e1cb19fd30e65dd5bef4a099117275541a40a950d3786a1"' : 'data-target="#xs-components-links-module-ErrorsHandlerModule-bd4629167157c1ae31179445add27c2581d966b16be12676a05fc84266d892b3ce96d80865dd0b618e1cb19fd30e65dd5bef4a099117275541a40a950d3786a1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ErrorsHandlerModule-bd4629167157c1ae31179445add27c2581d966b16be12676a05fc84266d892b3ce96d80865dd0b618e1cb19fd30e65dd5bef4a099117275541a40a950d3786a1"' :
                                            'id="xs-components-links-module-ErrorsHandlerModule-bd4629167157c1ae31179445add27c2581d966b16be12676a05fc84266d892b3ce96d80865dd0b618e1cb19fd30e65dd5bef4a099117275541a40a950d3786a1"' }>
                                            <li class="link">
                                                <a href="components/ErrorsHandlerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ErrorsHandlerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LayoutDefaultModule.html" data-type="entity-link" >LayoutDefaultModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LayoutDefaultModule-a08ff02739b918e4b25d2b989dab54e565a00584894f7ddebfa5a784c3d0a9acd92d5081fc665c24cfe4d8cc19d3c6867a30c7b67ef433cfe40fe88a90192c6f"' : 'data-target="#xs-components-links-module-LayoutDefaultModule-a08ff02739b918e4b25d2b989dab54e565a00584894f7ddebfa5a784c3d0a9acd92d5081fc665c24cfe4d8cc19d3c6867a30c7b67ef433cfe40fe88a90192c6f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LayoutDefaultModule-a08ff02739b918e4b25d2b989dab54e565a00584894f7ddebfa5a784c3d0a9acd92d5081fc665c24cfe4d8cc19d3c6867a30c7b67ef433cfe40fe88a90192c6f"' :
                                            'id="xs-components-links-module-LayoutDefaultModule-a08ff02739b918e4b25d2b989dab54e565a00584894f7ddebfa5a784c3d0a9acd92d5081fc665c24cfe4d8cc19d3c6867a30c7b67ef433cfe40fe88a90192c6f"' }>
                                            <li class="link">
                                                <a href="components/LayoutDefaultComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LayoutDefaultComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LayoutDefaultFooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LayoutDefaultFooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LayoutDefaultNavBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LayoutDefaultNavBarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoaderComponentModule.html" data-type="entity-link" >LoaderComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoaderComponentModule-8af0c624cb07bdbc3bfc2d4d3da0e7150990467667060daf433e8cd0f22c30e600694988ff66359c02da43015532a3bf0551f9735b2954491b4081aa8f3018d4"' : 'data-target="#xs-components-links-module-LoaderComponentModule-8af0c624cb07bdbc3bfc2d4d3da0e7150990467667060daf433e8cd0f22c30e600694988ff66359c02da43015532a3bf0551f9735b2954491b4081aa8f3018d4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoaderComponentModule-8af0c624cb07bdbc3bfc2d4d3da0e7150990467667060daf433e8cd0f22c30e600694988ff66359c02da43015532a3bf0551f9735b2954491b4081aa8f3018d4"' :
                                            'id="xs-components-links-module-LoaderComponentModule-8af0c624cb07bdbc3bfc2d4d3da0e7150990467667060daf433e8cd0f22c30e600694988ff66359c02da43015532a3bf0551f9735b2954491b4081aa8f3018d4"' }>
                                            <li class="link">
                                                <a href="components/LoaderComponentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoaderComponentComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link" >LoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginModule-8050d364a0efd8a6cfed13aef70cfb4e9ad869335068d4395df9a3091b5a481406eb6106aedf3734413e960919f8d50b4c482937d39ce1fb22f70196f37dffc8"' : 'data-target="#xs-components-links-module-LoginModule-8050d364a0efd8a6cfed13aef70cfb4e9ad869335068d4395df9a3091b5a481406eb6106aedf3734413e960919f8d50b4c482937d39ce1fb22f70196f37dffc8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginModule-8050d364a0efd8a6cfed13aef70cfb4e9ad869335068d4395df9a3091b5a481406eb6106aedf3734413e960919f8d50b4c482937d39ce1fb22f70196f37dffc8"' :
                                            'id="xs-components-links-module-LoginModule-8050d364a0efd8a6cfed13aef70cfb4e9ad869335068d4395df9a3091b5a481406eb6106aedf3734413e960919f8d50b4c482937d39ce1fb22f70196f37dffc8"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PagesModule.html" data-type="entity-link" >PagesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PagesModule-d0101f75c547f47cf490bb30f0c816f223ccff29f303a30d34f787dc0a17631ddda40ea898b4f0d720e321651e9db6baf70938bfabc84df883893baea9692cc0"' : 'data-target="#xs-components-links-module-PagesModule-d0101f75c547f47cf490bb30f0c816f223ccff29f303a30d34f787dc0a17631ddda40ea898b4f0d720e321651e9db6baf70938bfabc84df883893baea9692cc0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PagesModule-d0101f75c547f47cf490bb30f0c816f223ccff29f303a30d34f787dc0a17631ddda40ea898b4f0d720e321651e9db6baf70938bfabc84df883893baea9692cc0"' :
                                            'id="xs-components-links-module-PagesModule-d0101f75c547f47cf490bb30f0c816f223ccff29f303a30d34f787dc0a17631ddda40ea898b4f0d720e321651e9db6baf70938bfabc84df883893baea9692cc0"' }>
                                            <li class="link">
                                                <a href="components/ConfirmDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfirmDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubscribersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubscribersFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PagesRoutingModule.html" data-type="entity-link" >PagesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TranslocoRootModule.html" data-type="entity-link" >TranslocoRootModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Inyectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CreateOrUpdateSubscribersService.html" data-type="entity-link" >CreateOrUpdateSubscribersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeleteSubscribersService.html" data-type="entity-link" >DeleteSubscribersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetCountriesService.html" data-type="entity-link" >GetCountriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetSubscribersService.html" data-type="entity-link" >GetSubscribersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoginService.html" data-type="entity-link" >LoginService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TranslocoHttpLoader.html" data-type="entity-link" >TranslocoHttpLoader</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptores</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link" >AuthInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guardias</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/CheckLoginGuard.html" data-type="entity-link" >CheckLoginGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/LoginDataModel.html" data-type="entity-link" >LoginDataModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Patterns.html" data-type="entity-link" >Patterns</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscelánea</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Rutas</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Cobertura de la documentación</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentación generada utilizando <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise-inverted.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});