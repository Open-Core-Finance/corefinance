package tech.corefinance.common.repository;

import org.springframework.stereotype.Repository;
import tech.corefinance.common.model.DeleteTracking;

@Repository
public interface DeleteTrackingRepository extends CommonResourceRepository<DeleteTracking, String> {
}
