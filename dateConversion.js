/*
 *	Date Conversion Methods
 *		Mon 20 Jun 12:39:44 2016
 */

function convert() {
	for (var i = 0; i < records.length; i++) {
		var createdAtRaw = records[i].created_at.substring(0, 19) + '.000Z';
		var dateCreated = new Date(Date.parse(createdAtRaw));
		var diff = Math.abs(dateNow - dateCreated);
		var minutes = Math.floor((diff/1000)/60);

		// Append Records created within last hours to return list
		if (minutes < time) {
			var grantRequest = {
				'applicant': records[i].program_organization[0].name,
				'proposal': records[i].project_summary,
				'dateCreated': dateCreated,
				'dateNow': dateNow,
				'primaryContact': { 
					'firstName': records[i].grantee_org_owner[0].first_name,
					'lastName': records[i].grantee_org_owner[0].last_name,
					'email': records[i].grantee_org_owner[0].email
				}
			}; // Object to Append to return list

			// add secondary contact as well if it exists
			if ('grantee_signatory' in records[i] && 
						grantRequest.primaryContact.email !== records[i].grantee_signatory[0].email) 
				grantRequest.secondaryContact = {
					'firstName': records[i].grantee_signatory[0].first_name,
					'lastName': records[i].grantee_signatory[0].last_name,
					'email': records[i].grantee_signatory[0].email 
				};

			// add record to return list
			recentRecords.push(grantRequest);
		}
	}

	return recentRecords
}




