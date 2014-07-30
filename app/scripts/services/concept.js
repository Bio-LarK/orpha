'use strict';

/**
 * @ngdoc service
 * @name orphaApp.concept
 * @description
 * # concept
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
    .factory('Concept', function () {
        // Service logic
        // ...
        var Concept = function (attrs) {
            var self = this;
            var initialSettings = attrs || {};
            //initial settings if passed in
            for (var setting in initialSettings) {
                if (initialSettings.hasOwnProperty(setting)) {
                    self[setting] = initialSettings[setting];
                }
            }

            //with some logic...
            self.fullName = function () {
                return self.first + ' ' + self.last;
            };
            //return the scope-safe instance
            return self;
        };

        Concept.one = function () {
            return new Concept({
                label: 'Achondroplasia',
                synonyms: [],
                summary: 'Achondroplasia is the most common form of chondrodysplasia, characterized by rhizomelia, exaggerated lumbar lordosis, brachydactyly, and macrocephaly with frontal bossing and midface hypoplasia.',
                definition: '<p>Estimated incidence is at about 1/25,000 live births worldwide.</p><p>Characteristic clinical features (short limbs with rhizomelia, long and narrow trunk and macrocephaly with frontal bossing and midfacial hypoplasia with depressed nasal bridge) are visible at birth. Achievement of gross motor skills is slower than typical due to short limbs, short neck, and large head, in addition to hypotonia. Midface hypoplasia in combination with adenoid and tonsil hypertrophy can lead to obstructive sleep apnea. Chronic otitis media can lead to hearing problems. Dental crowding is common. Thoracolumbar kyphosis is very common in infancy. Most joints can be hyperextensible and hands are broad, short and trident shaped. Cord compression at the level of the foramen magnum can be encountered in infancy and early childhood causing central apnea, developmental delay, and long-track signs. Genu varum often occurs in childhood. There is also a small risk of hydrocephalus, with raised intracranial venous pressure. Lower lumbar spinal stenosis with accompanying neurological deficits, has an increased frequency in adulthood, as does cardiovascular disease. Obesity is a common issue. Adults reach a height of 131±5.6 cm (men) and 124±5.9 cm (women). Affected women must deliver by caesarian section due to small pelvis size.</p><p>Achondroplasia is due to mutations in the fibroblast growth factor receptor 3 (FGFR3) gene, encoding a transmembrane receptor that is important in regulating linear bone growth, among other functions.</p><p>Diagnosis is based on the presence of characteristic clinical and radiological findings. Skeletal X-rays demonstrate rhizomelia, generalized metaphyseal irregularities, narrowing of the interpediculate distance of the lower lumbar vertebrae and an abnormal pelvis with small square iliac wings and narrow sacrosciatic notch. Molecular genetic testing can confirm a diagnosis by the presence of a FGFR3 mutation.</p><p>Differential diagnoses include hypochondroplasia, thanatophoric dwarfism (types I and II), and SADDAN (see these terms).</p><p>Prenatal diagnosis can occur incidentally during routine prenatal ultrasound examination in the 3rd trimester. In high risk pregnancies, or in those where achondroplasia is suspected after an ultrasound, fetal DNA can be tested for the FGFR3 mutation to confirm diagnosis. Pre-implantation genetic diagnosis is possible in specialized laboratories.</p><p>Inheritance is autosomal dominant so genetic counseling is warranted. If one parent has achondroplasia there is a 50% chance of passing it on to offspring. In 80% of cases, it is due to a de novo mutation in children with parents of average stature. Homozygous achondroplasia is a lethal condition.</p><p>Management is multidisciplinary and anticipatory care is essential. Infants may require surgical decompression of the foramen magnum, and/or shunting for hydrocephalus. Some may choose controversial limb lengthening procedures. Treatment of ear infections and serous otitis media, along with assessment of any hearing problems is needed. Speech therapy can be offered if concerns arise. Treatment of obstructed sleep apnea may include adenotonsillectomy, weight loss, and/or continuous positive airway pressure. Surgical correction can re-align bowing of legs. Adult patients may require a lumbar laminectomy to treat spinal stenosis. Weight gain should be monitored in childhood to avoid later complications. Activities which lead to a risk of injury to the craniocervical junction should be avoided. Social and psychological support should be offered.</p><p>There is only a slight decrease in life expectancy compared to the general population, potentially due to cardiovascular disease.</p>',
                reviewers: [{
                    name: 'Dr Michael BOBER'
                }, {
                    name: 'Angela DUKER'
                }]
            });
        };

        // var Concept = Restangular.service('concepts');
        return Concept;
    });