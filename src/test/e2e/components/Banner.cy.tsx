import Banner from '../../../components/Banner';

describe('<Banner />', () => {
  it('renders', () => {
    cy.mount(<Banner />);
  });

  it('randers and loads logo', () => {
    cy.mount(<Banner />);

    cy.get('div')
      .contains('Providing Online Permitting All Over Alberta');
  });

  it('randers and loads logo', () => {
    cy.mount(<Banner />);

    cy.get('img', { timeout: 10000, includeShadowDom: true })
      .scrollIntoView() // Scroll into view to handle lazy loading
      .should('be.visible') // Ensure the image is visible
      .and(($img: { naturalWidth: unknown; }[]) => {
      // Ensure the image is loaded by checking its naturalWidth property
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });
});
